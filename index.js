const webpush = require('web-push');
const express = require('express');

const publicVapidKey = 'BDcLiOqg-sELmwErOvJcSWWHFEIsyQb9zh1SiYkUV6yEuVl_WhYzUTeAj8ZwE91HVMcuVicPiYS8aSdlJkCdfeU';
const privateVapidKey = 'PsDozmWpLee7PPTJf9h9EbjQwXvx_7_ecpVeaXZnOU8';
const PORT = process.env.PORT || 3000;
// Replace with your email
webpush.setVapidDetails('mailto:val@karpov.io', publicVapidKey, privateVapidKey);

const app = express();

app.use(require('body-parser').json());

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.use(require('express-static')('./'));

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
});
