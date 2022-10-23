//
// Background Script (Servive Worker)
//

// インストールされたとき
chrome.runtime.onInstalled.addListener(() => {

    // コンテキストメニューに項目を追加
    const options = {
        id: "quote_it",
        title: "Quote it",
        contexts: ['page']
    };
    chrome.contextMenus.create(options);

});

// コンテキストメニュークリック時
chrome.contextMenus.onClicked.addListener((info, tab) => {

    console.log("[DEBUG] Context menu clicked! sending current tab info to contents-script...");

    // コンテンツスクリプトに情報を飛ばす
    chrome.tabs.sendMessage(tab.id, {
        "id": "quote_click_contextmenu",
        "info": info,
        "tab": tab
    }).then((response) => {
        // 正常に送信できた
        console.log("[DEBUG] Response from contents-script:");
        console.log(response);
    }).catch((error) => {
        // メッセージを送れなかった
        console.log("[DEBUG] Failed to send message!");
        console.log(error);
    });

});


