// Twikoo Netlify Function
const twikoo = require('twikoo-netlify')

exports.handler = async (event, context) => {
  // 设置 CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  }

  // 处理 OPTIONS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    }
  }

  try {
    // 调用 Twikoo Netlify handler
    const response = await twikoo.handler(event, context)
    
    // 添加 CORS 头到响应中
    return {
      ...response,
      headers: {
        ...response.headers,
        ...corsHeaders
      }
    }
  } catch (error) {
    console.error('Twikoo error:', error)
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: 500,
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
}
