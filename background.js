// STUDIO User Agent Switcher Background Script

// 偽装するUser Agent
const FAKE_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

// app.studio.design のURLパターン
const STUDIO_URL_PATTERN = "*://app.studio.design/*";

/**
 * リクエストヘッダーを変更してUser Agentを偽装する
 */
function modifyUserAgent(details) {
    // リクエストヘッダーからUser-Agentを探して置き換える
    for (let i = 0; i < details.requestHeaders.length; i++) {
        if (details.requestHeaders[i].name.toLowerCase() === "user-agent") {
            details.requestHeaders[i].value = FAKE_USER_AGENT;
            console.log("User Agent switched for STUDIO:", FAKE_USER_AGENT);
            break;
        }
    }

    return { requestHeaders: details.requestHeaders };
}

/**
 * webRequest リスナーを設定
 */
function setupWebRequestListener() {
    // onBeforeSendHeaders イベントでリクエストヘッダーを変更
    browser.webRequest.onBeforeSendHeaders.addListener(
        modifyUserAgent,
        {
            urls: [STUDIO_URL_PATTERN]
        },
        ["blocking", "requestHeaders"]
    );

    console.log("STUDIO User Agent Switcher: Background script loaded");
    console.log("Target URL pattern:", STUDIO_URL_PATTERN);
    console.log("Target User Agent:", FAKE_USER_AGENT);
}

// 拡張機能の初期化
setupWebRequestListener();

// 拡張機能がインストールされた時の処理
browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        console.log("STUDIO User Agent Switcher installed");
    } else if (details.reason === "update") {
        console.log("STUDIO User Agent Switcher updated");
    }
});

// 拡張機能が開始された時の処理
browser.runtime.onStartup.addListener(() => {
    console.log("STUDIO User Agent Switcher started");
});
