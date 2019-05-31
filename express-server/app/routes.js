/* eslint-disable */
var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
};

// 条件查询,通过用户名来查询
function getAccount(account, res) {
    var whereStr = { "account": account };
    Todo.find(whereStr, function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    })
}
//
function log(account, password, res) {
    var whereStr = { "account": account, "password": password };
    Todo.find(whereStr, function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    })
}
//更新存款
function updateBalance(account, balance, res) {
    var whereStr = { "account": account };
    var set = { $set: { "balance": balance } };
    Todo.updateOne(whereStr, set, function () { });
}

module.exports = function (app) {
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });
    app.post('/api/todos', function (req, res) {
        // 注册
        if ((req.body.name != undefined) && (req.body.account != undefined) && (req.body.password != undefined)) {
            Todo.create({
                account: req.body.account,
                password: req.body.password,
                name: req.body.name,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);
                getTodos(res);
            });
        }
        //转账
        else if ((req.body.trans_money != undefined) && (req.body.trans_account != undefined)) {
            updateBalance(req.body.account, req.body.balance);
            var result = { "account": req.body.trans_account };
            Todo.findOne(result, function (err, todo) {
                if(todo!=[]){
                updateBalance(todo.account, todo.balance + req.body.trans_money);
                Todo.findOne({ "account": req.body.account }, function (err, re) {
                    updateBalance(re.account, re.balance - req.body.trans_money);
                    getAccount(req.body.account, res);
                })
                }
            });
        }
        //登录
        else if ((req.body.account != undefined) && (req.body.password != undefined)) {
            log(req.body.account, req.body.password, res);
        }
        //存款
        else if ((req.body.deposit != undefined) && (req.body.account != undefined)) {
            var result = { "account": req.body.account };
            Todo.findOne(result, function (err, todo) {
                var money = todo.balance + req.body.deposit;
                updateBalance(todo.account, money);
                getAccount(req.body.account, res);
            });
        }
        //取款
        else if ((req.body.withdraw != undefined) && (req.body.account != undefined)) {
            var result = { "account": req.body.account };
            Todo.findOne(result, function (err, todo) {
                var money = todo.balance - req.body.withdraw;
                updateBalance(todo.account, money);
                getAccount(req.body.account, res);
            });
        }

    });
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
