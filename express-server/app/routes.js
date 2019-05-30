/* eslint-disable */
const Account = require('./models/account');

/**
 * @description 得到所有账号资料
 * @author JHSeng
 * @date 2019-05-29
 * @param {*} res
 */
function getAccounts(res) {
  Account.find((err, accounts) => {
    if (err) {
      res.send(err);
    }
    res.json(accounts);
  });
}

function isExist(accountName, passwd) {
  //查询账户是否在数据库中
}

module.exports = (app) => {
  // 得到所有账户资料
  app.get('/api/getAccounts', (req, res) => {
    getAccounts(res);
  });
  // 创建账户
  app.post('/api/regist', (req, res) => {
    Account.create({
      accountName: req.body.account,
      passwd: req.body.passwd,
      nickName: req.body.name,
      balance: 0.0
    }, (err, account) => {
      if (err)
        res.send(err);
      getAccounts(res);
    });
  });
  //登录账户
  app.post('/api/login', (req, res) => {
    Account.login({
      accountName: req.body.account,
      passwd: req.body.passwd,
    }, (err, account) => {
      if (err)
        res.send(err);
      //检查账户是否在数据库中
      if (isExist(accountName, passwd)) {

      } else return;
    });
  });

  app.post('/api/trans', (req, res) => {
    Account.trans({
      tranMoney: req.body.tranMoney
    }, (err) => {
      if (err)
        res.send(err);

    });
  });

  // app.get('*', (req, res) => {
  //   res.sendFile(__dirname + 'public/index.html');
  // });
};
