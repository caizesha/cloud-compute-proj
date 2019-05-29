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

module.exports = (app) => {
  // 得到所有账户资料
  app.get('/api/accounts', (req, res) => {
    getAccounts(res);
  });
  // 创建账户
  app.post('/api/accounts', (req, res) => {
    Account.create({
      accountName: req.body.account,
      passwd: req.body.passwd,
      nickName: req.body.name,
      balance: 0.0,
    }, (err, account) => {
      if (err) {
        res.send(err);
      }
      getAccounts(res);
    });
  });

  app.get('*', (req, res) => {
    res.sendFild(__dirname + 'public/index.html');
  });
};
