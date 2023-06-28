module.exports = {
    packagerConfig: {
        icon: './public/icons/icon.ico'
    },
    makers: [
        {
            name: '@electron-forge/maker-dmg'
        }
    ],
};