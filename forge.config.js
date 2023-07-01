module.exports = {
    packagerConfig: {
        icon: './public/icons/icon.ico'
    },
    makers: [
        {
            name: '@electron-forge/maker-dmg'
        }
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'Ishaan Shettigar',
                    name: 'iDG10-GUI-Hackathon'
                },
                prerelease: true
            }
        }
    ]
};