// // background.js
// chrome.runtime.onStartup.addListener(createContextMenu);
// chrome.runtime.onInstalled.addListener(createContextMenu);

// function createContextMenu() {
//   // 使用 try-catch 保護，防止在已存在的情況下重複創建
//   try {
//     // 先嘗試刪除已存在的選單，避免重複 ID 錯誤
//     chrome.contextMenus.removeAll(() => {
//       chrome.contextMenus.create({
//         id: "saveImageWithDescription",
//         title: "保存圖片和說明",
//         contexts: ["image"]
//       });
//     });
//   } catch (e) {
//     console.error("Error creating context menu:", e);
//   }
// }

// // 監聽右鍵選單點擊事件
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "saveImageWithDescription") {
//     chrome.tabs.sendMessage(tab.id, { action: "getImageAndDescription", srcUrl: info.srcUrl });
//   }
// });


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
