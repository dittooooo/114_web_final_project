# 飲食紀錄

## 系統架構說明

本系統採用前後端分離架構，前端使用 React 提供使用者介面，後端使用 Node.js 與 Express 提供 RESTful API，並透過 docker 建立 MongoDB 作為主要資料庫。
前端透過 HTTP 請求與後端 API 溝通，後端負責處理商業邏輯、資料驗證與資料存取，確保系統模組化與可維護性。

## 技術堆疊

- **frontend:**
  - React
  - CSS
- **backend**
  - Node.js
  - Express
- **database**

  - MongoDB
  - Docker

## 功能特色

### 一、管理飲食紀錄

**1. 新增飲食紀錄:**

基本欄位

- 料理名稱 (必填)
- 餐別（早餐 / 午餐 / 晚餐）
- 日期（預設今天）
- 照片（選填，最多 1 張）
- 簡短描述（選填，不超過 100 字）

備註

- 不可選擇未來日期
- 表單上傳前，前端先做初步驗證和錯誤提示。
- 上傳成功後顯示提示並跳轉至首頁。

**2. 修改飲食紀錄:**

- 點擊以上傳的飲食紀錄後即可修改該筆紀錄，每個欄位皆可更動，選填內容可為直接刪除。
- 儲存後確認必填欄位皆有填寫即可上傳，成功上傳後顯示提示並跳轉至首頁。

**3. 刪除飲食紀錄:**

- 刪除前跳出確認視窗
- 刪除後顯示提示並跳轉至首頁。

### 二、瀏覽飲食紀錄 (預設首頁)

**1. 飲食紀錄完整列表:**

- 顯示所有飲食紀錄
- 依照日期排序 (新到舊)
- 每筆顯示: 日期、餐別、料理名稱、縮圖

**2. 依日期查詢:**

- 瀏覽飲食紀錄頁面上可點選日期，去顯示特定日期的紀錄。
- 為選日期預設顯示全部記錄
- 查詢日期無紀錄資料，顯示「當日尚無紀錄」

**3. 飲食紀錄詳細資料:**

- 點擊紀錄可看到詳細資料(簡短描述)和編輯、刪除按鈕

### 三、使用者系統

**1. 註冊/登入:**

- 註冊需輸入: 使用者名稱、Email、密碼。
- 註冊完後跳轉至登入頁面。
- 登入後取得 token
- token 存在 localStorage
- 登出後清除 token

**2. 權限:**

- 未登入: 只能看到首頁、登入、註冊頁面。
- 已登入: 能看到首頁、上傳瀏覽/編輯/刪除飲食紀錄。
- 每個使用者只能看到自己的飲食紀錄。

## API 架構

```bash
    backend

    POST /api/meals
    GET /api/meals
    GET /api/meals?date=YYYY-MM-DD
    GET /api/meals/:id
    PUT /api/meals/:id
    DELETE /api/meals/:id
```

## 前端介面架構

```bash
    /               首頁
    # 已登入: Welcome + Navbar
    # 未登入: Welcome + Navbar + Meals list

    /login          登入
    /register       註冊
    /meals/new      新增飲食紀錄
    /meals/:id      飲食紀錄詳情
    /meals/:id/edit 飲食紀錄編輯
```

## 資料庫設計

**User**

- username: String
- email: String
- password: String (hashed)
- createdAt: Date

**Meal**

- userId: ObjectId (ref: User)
- title: String
- mealType: Breakfast / Lunch / Dinner
- date: Date
- imageUrl: String
- description: String
- createdAt: Date
- updatedAt: Date

## 專案架構

```bash
114_web_final_project/
 ├── backent/
 │    ├── docker/
 │    └── server/
 ├── frontend/
 │    ├── public/
 │    └── src/
 │        ├── pages/
 │        │    ├── HomePage.jsx
 │        │    ├── LoginPage.jsx
 │        │    ├── RegisterPage.jsx
 │        │    ├── MealCreatePage.jsx
 │        │    └── MealEditPage.jsx
 │        ├── components/
 │        │    ├── Navbar.jsx
 │        │    ├── MealCard.jsx
 │        │    ├── MealInfoModule.jsx
 │        │    └── DateFilter.jsx
 │        ├── App.jsx
 │        ├── index.css
 │        └── main.jsx
 ├── docs/
 └── README.md
```
