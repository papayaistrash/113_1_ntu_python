// // content.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "getImageAndDescription") {
//     const imageUrl = message.srcUrl;
//     const description = findDescription(imageUrl);  // 假設有一個函數找到說明
//     chrome.storage.local.get({ images: [] }, (result) => {
//       const images = result.images;
//       images.push({ url: imageUrl, description: description });
//       chrome.storage.local.set({ images: images });
//     });
//   }
// });

// function findDescription(imageUrl) {
//   // 獲取當前選取的文字
//   const selectedText = window.getSelection().toString().trim();
//   if (selectedText) {
//     // 如果有選取的文字，返回該文字作為說明
//     return selectedText;
//   }

//   // 找到所有的圖片元素
//   const images = document.querySelectorAll("img");
  
//   // 遍歷所有圖片，尋找與給定URL匹配的圖片
//   for (let img of images) {
//     if (img.src === imageUrl) {
//       // 獲取該圖片的父元素
//       const parent = img.parentElement;

//       // 嘗試從圖片的父元素或周圍的元素中獲取說明
//       let description = parent ? parent.innerText : "";

//       // 如果父元素的文本內容不包含描述，則可以向上遍歷至祖先元素
//       if (!description) {
//         let ancestor = parent;
//         while (ancestor && ancestor !== document.body) {
//           ancestor = ancestor.parentElement;
//           if (ancestor) {
//             description = ancestor.innerText || description;
//           }
//         }
//       }

//       // 去除多餘的空格和換行，並返回找到的描述
//       return description.trim();
//     }
//   }

//   // 如果找不到描述，返回一個預設值
//   return "未找到相關說明文字";
// }




// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "getImageAndDescription") {
//     const imageUrl = message.srcUrl;
//     // 將用戶選取的文本複製到剪貼板
//     getSelectedText().then(selectedText => {
//       if (selectedText) {
//         copyToClipboard(selectedText); // 將選取的文本複製到剪貼板
//         // 繼續儲存選取的文本作為描述
//         saveImageAndDescription(imageUrl, selectedText);
//       } else {
//         const description = findDescription(imageUrl);
//         // 如果沒有選取的文本，使用找到的描述
//         copyToClipboard(description); // 將找到的描述複製到剪貼板
//         saveImageAndDescription(imageUrl, description);
//       }
//     });
//   }
// });

// // 使用 Clipboard API 獲取用戶選取的文字
// async function getSelectedText() {
//   try {
//     const text = await navigator.clipboard.readText();
//     return text.trim();
//   } catch (err) {
//     console.error('無法訪問剪貼板：', err);
//     return '';
//   }
// }

// // 自動複製文本到剪貼板
// async function copyToClipboard(text) {
//   try {
//     await navigator.clipboard.writeText(text);
//     console.log('文本已複製到剪貼板:', text);
//   } catch (err) {
//     console.error('無法複製到剪貼板：', err);
//   }
// }

// // 儲存圖片和描述
// function saveImageAndDescription(imageUrl, description) {
//   chrome.storage.local.get({ images: [] }, (result) => {
//     const images = result.images;
//     images.push({ url: imageUrl, description: description });
//     chrome.storage.local.set({ images: images });
//   });
// }

// function findDescription(imageUrl) {
//   // 找到所有的圖片元素
//   const images = document.querySelectorAll("img");
  
//   // 遍歷所有圖片，尋找與給定URL匹配的圖片
//   for (let img of images) {
//     if (img.src === imageUrl) {
//       // 獲取該圖片的父元素
//       const parent = img.parentElement;

//       // 嘗試從圖片的父元素或周圍的元素中獲取說明
//       let description = parent ? parent.innerText : "";

//       // 如果父元素的文本內容不包含描述，則可以向上遍歷至祖先元素
//       if (!description) {
//         let ancestor = parent;
//         while (ancestor && ancestor !== document.body) {
//           ancestor = ancestor.parentElement;
//           if (ancestor) {
//             description = ancestor.innerText || description;
//           }
//         }
//       }

//       // 去除多餘的空格和換行，並返回找到的描述
//       return description.trim();
//     }
//   }

//   // 如果找不到描述，返回一個預設值
//   return "未找到相關說明文字";
// }


// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getImageAndDescription") {
    const imageUrl = message.srcUrl;

    // 獲取用戶選取的文字
    const selectedText = getSelectedText();
    if (selectedText) {
      copyToClipboard(selectedText); // 將選取的文本複製到剪貼板
      saveImageAndDescription(imageUrl, selectedText);
    } else {
      const description = findDescription(imageUrl);
      copyToClipboard(description); // 將找到的描述複製到剪貼板
      saveImageAndDescription(imageUrl, description);
    }
  }
});

// 獲取當前選取的文字
function getSelectedText() {
  const selection = window.getSelection();
  return selection.toString().trim();
}

// 自動複製文本到剪貼板
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('文本已複製到剪貼板:', text);
  } catch (err) {
    console.error('無法複製到剪貼板：', err);
  }
}

// 儲存圖片和描述
function saveImageAndDescription(imageUrl, description) {
  chrome.storage.local.get({ images: [] }, (result) => {
    const images = result.images;
    images.push({ url: imageUrl, description: description });
    chrome.storage.local.set({ images: images });
  });
}

function findDescription(imageUrl) {
  // 找到所有的圖片元素
  const images = document.querySelectorAll("img");

  // 遍歷所有圖片，尋找與給定URL匹配的圖片
  for (let img of images) {
    if (img.src === imageUrl) {
      // 獲取該圖片的父元素
      const parent = img.parentElement;

      // 嘗試從圖片的父元素或周圍的元素中獲取說明
      let description = parent ? parent.innerText : "";

      // 如果父元素的文本內容不包含描述，則可以向上遍歷至祖先元素
      if (!description) {
        let ancestor = parent;
        while (ancestor && ancestor !== document.body) {
          ancestor = ancestor.parentElement;
          if (ancestor) {
            description = ancestor.innerText || description;
          }
        }
      }

      // 去除多餘的空格和換行，並返回找到的描述
      return description.trim();
    }
  }

  // 如果找不到描述，返回一個預設值
  return "未找到相關說明文字";
}
