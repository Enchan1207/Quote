//
// Contents Script
//

// バックグラウンドスクリプトからのメッセージを受け取る
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    // idを取得
    const messageID = message.id;

    // コンテキストメニューからのメッセージなら反応する
    if (messageID === "quote_click_contextmenu") {
        const quoteStatement = createQuote(message.tab);
        console.log(quoteStatement);

        // クリップボードに設定
        try {
            await navigator.clipboard.writeText(quoteStatement);
        } catch (error) {
            console.error("Failed to copy quote statement", error);
        }
    }

});

/**
 * タブの内容から引用文を生成する
 * @param {Tab} tab 対象のタブオブジェクト
 * @return 生成された引用文
 */
const createQuote = (tab) => {
    const title = tab.title;
    const url = tab.url;

    return `[${title}](${url})`;
};
