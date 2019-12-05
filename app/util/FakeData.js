import { ArrayHelper } from "./index";

export const Users = [
    {
        name: 'Matt',
        image: 'https://semantic-ui.com/images/avatar/small/matt.jpg',
    },
    {
        name: 'Elliot Fu ',
        image: 'https://semantic-ui.com/images/avatar/small/elliot.jpg'
    },
    {
        name: 'Jenny Hess',
        image: 'https://semantic-ui.com/images/avatar/small/jenny.jpg'
    },
    {
        name: 'Joe Henderson',
        image: 'https://semantic-ui.com/images/avatar/small/joe.jpg'
    }
];

export const Messages = [
    'How artistic!',
    'This has been very useful for my research. Thanks as well!',
    'Elliot you are always so right :)',
    'Dude, this is awesome. Thanks so much'
];

export const ExampleCommentSet = [
    {
        user: ArrayHelper.random(Users),
        message: ArrayHelper.random(Messages),
        timecode: 'Today at 5:42PM',
        replies: [
            {
                user: ArrayHelper.random(Users),
                message: ArrayHelper.random(Messages),
                timecode: 'Just now',
                replies: [
                    {
                        user: ArrayHelper.random(Users),
                        message: ArrayHelper.random(Messages),
                        timecode: 'Just now'
                    },
                    {
                        user: ArrayHelper.random(Users),
                        message: ArrayHelper.random(Messages),
                        timecode: 'Just now',
                        replies: [
                            {
                                user: ArrayHelper.random(Users),
                                message: ArrayHelper.random(Messages),
                                timecode: 'Just now'
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        user: ArrayHelper.random(Users),
        message: ArrayHelper.random(Messages),
        timecode: 'Yesterday at 12:30AM',
        replies: [
            {
                user: ArrayHelper.random(Users),
                message: ArrayHelper.random(Messages),
                timecode: 'Just now'
            },
            {
                user: ArrayHelper.random(Users),
                message: ArrayHelper.random(Messages),
                timecode: 'Just now',
                replies: [
                    {
                        user: ArrayHelper.random(Users),
                        message: ArrayHelper.random(Messages),
                        timecode: 'Just now'
                    }
                ]
            }
        ]
    },
    {
        user: ArrayHelper.random(Users),
        message: ArrayHelper.random(Messages),
        timecode: '5 days ago'
    }
];
