const getAsyncStorageProp = (prop) => {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get([prop], (data) => {
            resolve( prop ? data[prop] : data);
        });
    });
};
