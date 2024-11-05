# 113_1_ntu_python
113-1 台大python課程專案


### 插件的架構概覽

這個Chrome插件將主要由以下幾個部分組成：

1. **`manifest.json`**: 插件的配置文件，用來定義插件的名稱、版本、權限以及功能等。
2. **背景腳本（`background.js`）**: 管理右鍵選單，並處理圖片和說明文字的收集。
3. **內容腳本（`content.js`）**: 插入到網頁中，用來解析頁面，取得圖片說明的相關信息。
4. **UI頁面（例如`popup.html`和`popup.js`）**: 用來顯示已收集的圖片和說明。
5. **樣式文件（`styles.css`）**: 定義UI的樣式，使UI更美觀。

### 檔案列表

1. **`manifest.json`**: 定義插件的基本資訊和權限
2. **`background.js`**: 負責右鍵選單的設置和處理選取圖片和說明文字的請求
3. **`content.js`**: 解析網頁內容，找到圖片的說明文字
4. **`popup.html`**: 顯示收集到的圖片和說明的UI頁面
5. **`popup.js`**: 用於處理和渲染`popup.html`的邏輯
6. **`styles.css`**: 定義UI的樣式

### 每個檔案的詳細功能

#### 1. `manifest.json`
   定義插件的基礎配置和所需權限，例如`contextMenus`（右鍵選單）權限和`activeTab`（目前頁面）權限。

   ```json
   {
     "manifest_version": 3,
     "name": "論文圖片收集工具",
     "version": "1.0",
     "description": "收集網頁上的圖片和相關說明",
     "permissions": ["contextMenus", "activeTab", "storage"],
     "background": {
       "service_worker": "background.js"
     },
     "content_scripts": [
       {
         "matches": ["<all_urls>"],
         "js": ["content.js"]
       }
     ],
     "action": {
       "default_popup": "popup.html"
     }
   }
   ```

#### 2. `background.js`
   創建右鍵選單並處理右鍵選擇圖片的事件。當用戶選擇圖片後，背景腳本會將圖片及其說明存到Chrome的儲存空間中。

   ```javascript
   // background.js
   chrome.runtime.onInstalled.addListener(() => {
     chrome.contextMenus.create({
       id: "saveImageWithDescription",
       title: "保存圖片和說明",
       contexts: ["image"]
     });
   });

   chrome.contextMenus.onClicked.addListener((info, tab) => {
     if (info.menuItemId === "saveImageWithDescription") {
       chrome.tabs.sendMessage(tab.id, { action: "getImageAndDescription", srcUrl: info.srcUrl });
     }
   });
   ```

#### 3. `content.js`
   內容腳本負責解析圖片的說明。當背景腳本請求圖片和說明時，內容腳本會查找圖片的周圍文字，並將其作為說明回傳。

   ```javascript
   // content.js
   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
     if (message.action === "getImageAndDescription") {
       const imageUrl = message.srcUrl;
       const description = findDescription(imageUrl);  // 假設有一個函數找到說明
       chrome.storage.local.get({ images: [] }, (result) => {
         const images = result.images;
         images.push({ url: imageUrl, description: description });
         chrome.storage.local.set({ images: images });
       });
     }
   });

   function findDescription(imageUrl) {
     // 這裡會實作解析圖片的說明邏輯
     // 可以透過DOM結構、標籤來找出圖片附近的說明文字
     return "圖片的相關說明文字";  // 假設返回找到的說明文字
   }
   ```

#### 4. `popup.html`
   插件的彈出頁面，用於顯示已收集到的圖片和說明。

   ```html
   <!-- popup.html -->
   <html>
   <head>
     <link rel="stylesheet" href="styles.css">
   </head>
   <body>
     <div id="imageContainer"></div>
     <script src="popup.js"></script>
   </body>
   </html>
   ```

#### 5. `popup.js`
   負責從Chrome的儲存空間中讀取圖片和說明，並將它們渲染在彈出頁面上。

   ```javascript
   // popup.js
   document.addEventListener("DOMContentLoaded", () => {
     const imageContainer = document.getElementById("imageContainer");
     chrome.storage.local.get("images", (result) => {
       const images = result.images || [];
       images.forEach((item) => {
         const imgElem = document.createElement("img");
         imgElem.src = item.url;
         const descElem = document.createElement("p");
         descElem.textContent = item.description;
         imageContainer.appendChild(imgElem);
         imageContainer.appendChild(descElem);
       });
     });
   });
   ```

#### 6. `styles.css`
   定義彈出頁面中圖片和說明的基本樣式。

   ```css
   /* styles.css */
   #imageContainer {
     display: flex;
     flex-direction: column;
     align-items: center;
   }
   img {
     max-width: 200px;
     margin-bottom: 5px;
   }
   p {
     font-size: 14px;
     color: #333;
   }
   ```

### 實現流程
1. **右鍵選單創建**：使用者右鍵點擊圖片時，可選擇「保存圖片和說明」。
2. **圖片和說明的解析**：插件會嘗試找到與圖片相關的說明，並將圖片URL與說明存儲。
3. **彈出頁面顯示**：點擊插件圖標時，會彈出`popup.html`頁面，顯示所有已保存的圖片和說明。

這樣的結構應該能滿足您的需求。如果您希望進一步實現某些細節，隨時告訴我。
