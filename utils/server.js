// request请求
const baseUrl = "https://isluo.com/";
const client_id = '22a86ed438344c02ceed';
const client_secret = 'eff52457aaa6248cb6a655e8d3a8c068cdfbf0d0';
const request = (url, params={}, method="GET") => {
  return new Promise((res, rej)=>{
    wx.request({
      url: `${baseUrl}/${url}`,
      data: params,
      method,
      dataType: 'json',
      success: function(msg){
        res(msg);
      },
      fail: function(e){
        rej(e);
      }
    })
  });
  
}

module.exports = {
  request
}
