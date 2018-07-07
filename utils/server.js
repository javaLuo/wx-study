// request请求
const baseUrl = "https://isluo.com";

const request = (url, params={}, method="GET") => {
  return new Promise((res, rej)=>{
    wx.request({
      url: `${baseUrl}/${url}`,
      data: JSON.stringify(params),
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
