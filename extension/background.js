/*global chrome, a*/
/*eslint no-undef: "error"*/

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ token: '' })
})