export default {

  environment: process.env.NODE_ENV === 'development' ? 'development' : 'production', //环境判断

  baseUrl: {
    dev: '/devApi',
    pro: 'http://129.28.67.91/Beesbit/API/public/'
  }
}
