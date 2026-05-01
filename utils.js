// ========================================
// 工具函式
// ========================================

const { all } = require('axios');
const dayjs = require('dayjs');

/**
 * 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 例如 '8折'
 */
function getDiscountRate(product) {
  // 請實作此函式
  // originalPrice vs. price
  const discountRate = Math.round((product.price/product.originalPrice)*100);
  const discountRateStr = (discountRate/10).toString();
  return `${discountRateStr}折`;
}

/**
 * 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 分類陣列
 */
function getAllCategories(products) {
  // 請實作此函式
  const allCategories = products.map( product => product.category);
  // return [...new Set(allCategories)];
  return Array.from(new Set(allCategories));
}

/**
 * 格式化日期
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 格式 'YYYY/MM/DD HH:mm'，例如 '2024/01/01 08:00'
 */
function formatDate(timestamp) {
  // 請實作此函式
  // 提示：dayjs.unix...
  return dayjs.unix(timestamp).format('YYYY/MM/DD HH/mm');
}
/**
 * 計算距今天數
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 例如 '3 天前'
 */
function getDaysAgo(timestamp) {
  // 請實作此函式
  // 提示：
  // 1. 用 dayjs() 取得今天
  // 2. 用 dayjs.unix(timestamp) 取得日期
  // 3. 用 .diff() 計算天數差異
  const diffDaysFromToday = dayjs.unix(timestamp).diff(dayjs(),'day');
  if(diffDaysFromToday>0) return `${diffDays}天後`;
  if(diffDaysFromToday<0) return `${diffDays}天前`;
  return '今天';
}

/**
 * 驗證訂單使用者資料
 * @param {Object} data - 使用者資料
 * @returns {Object} - { isValid: boolean, errors: string[] }
 * 
 * 驗證規則：
 * - name: 不可為空
 * - tel: 必須是 09 開頭的 10 位數字
 * - email: 必須包含 @ 符號
 * - address: 不可為空
 * - payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一
 */
function validateOrderUser(data) {
  // 請實作此函式
  // 請實作此函式
  let errorStringArray = [];
  let isValid = true;

 // 驗證規則：name: 不可為空
 if(data.name.trim()=="") {
  isValid = false;
  errorStringArray.push("name: 不可為空");
 }
 // 驗證規則：tel: 必須是 09 開頭的 10 位數字
 if(!/^09\d{8}/.test(data.tel)) {
  isValid = false;
  errorStringArray.push("tel: 必須是 09 開頭的 10 位數字");
 }
 // 驗證規則：email: 必須包含 @ 符號
 if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
  isValid = false;
  errorStringArray.push("email: 必須包含 @ 符號");
 }
 // 驗證規則：address: 不可為空
 if(!/^\p{Script=Han}+$/u.test(data.address)) {
  isValid = false;
  errorStringArray.push("address: 不可為空");
 }
 // 驗證規則：payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一
 if(!data.payment.trim()!=='') {
  if(!(data.payment === 'ATM' || data.payment === 'Credit Card' || data.payment === 'Apple Pay')){
    isValid = false;
    errorStringArray.push("payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一");
  }
 }

  return{
    isValid: isValid,
    errors: errorStringArray
  };
}

/**
 * 驗證購物車數量
 * @param {number} quantity - 數量
 * @returns {Object} - { isValid: boolean, error?: string }
 * 
 * 驗證規則：
 * - 必須是正整數
 * - 不可小於 1
 * - 不可大於 99
 */
function validateCartQuantity(quantity) {
  // 請實作此函式
  const errString = [];
  const isValid = Number.isInteger(quantity) && quantity > 0 && quantity < 100;

  if(!isValid){
    // 錯誤訊息堆疊：必須是正整數
    if(!Number.isInteger(quantity)) errString.push('必須是正整數;');
    // 錯誤訊息堆疊：不可小於 1
    if(!quantity > 0) errString.push('不可小於 1;');
    // 錯誤訊息堆疊：不可大於 99
    if(!quantity < 100) errString.push('不可大於 99;');
  }
  
  return {
    isValid:isValid,
    error:errString.toString()
  };
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string} - 格式化後的金額
 * 
 * 格式化規則：
 * - 加上 "NT$ " 前綴
 * - 數字需要千分位逗號分隔（例如：1000 → 1,000）
 * - 使用台灣格式（zh-TW）
 * 
 * 範例：
 * formatCurrency(1000) → "NT$ 1,000"
 * formatCurrency(1234567) → "NT$ 1,234,567"
 * 
 */
function formatCurrency(amount) {
  // 請實作此函式
  const moneyFormatted = amount.toLocaleString('zh-TW');
  return `NT$ ${moneyFormatted}`;
}

module.exports = {
  getDiscountRate,
  getAllCategories,
  formatDate,
  getDaysAgo,
  validateOrderUser,
  validateCartQuantity,
  formatCurrency
};
