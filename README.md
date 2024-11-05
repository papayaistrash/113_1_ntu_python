# 113_1_ntu_python
113-1 台大python課程專案

my-image-collector-extension/
│
├── manifest.json            # 插件的配置文件，定義插件的基本信息和權限
├── background.js            # 處理右鍵點擊事件並調用相應的邏輯
├── content.js               # 負責頁面上的圖片與說明的擷取邏輯
├── popup.html               # 插件的彈出頁面（若需要檢視所擷取的內容）
├── popup.js                 # 用來控制 popup.html 的行為邏輯
└── styles.css               # 插件的樣式（可選）

