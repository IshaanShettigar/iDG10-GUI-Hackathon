export const packagerConfig = {
    icon: './public/icons/icon.ico'
};
export const makers = [
    {
        name: '@electron-forge/maker-dmg'
    }
];
export const publishers = [
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
];