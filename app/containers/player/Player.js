import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactJWPlayer from 'react-jw-player';
import { ArrayHelper } from "../../util";
import { useSnackbar, WithSnackbarProps } from 'notistack';
import './index.css';

const Player = (props) => {
    const AdList = [
        'https://an.yandex.ru/meta/347075?imp-id=2&charset=UTF-8&target-ref=http%3A%2F%2Flimehd.ru&page-ref=http%3A%2F%2Flimehd.ru&rnd={random}',
        'http://ads.adfox.ru/315450/getCode?p1=cgmqy&p2=frfe&pfc=clrey&pfb=gwhhh&puid1=&puid2=&puid3=&pr={random}&ptrc=b',
        'https://out.pladform.ru/getVast?pl=116720&type=preroll&license=1&thematic=1762&age=5&duration=0&target=mobileapp&adformat=3&advertiser_id=',
    ];

    let Snack;

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [ lastAd, setLastAd ] = useState(null);


    const playlistVR = [{
        file: 'https://cdn.jwplayer.com/videos/AgqYcfAT-8yQ1cYbs.mp4',
        title: 'Caminandes VR',
        mediaid: 'AgqYcfAT',
        stereomode: 'monoscopic'
    }];

    const onPlaylist = (e) => {
        //Player.playAd(addPreroll(e));
    };

    const onReady = (event) => {
        const player = window.jwplayer('my-unique-id');

        closeSnackbar(Snack)
    };

    const onVideoLoad = (event) => {
        //closeSnackbar(Snack);
    };

    const addPreroll = (video) => {
        return getAd();
    };

    const getAd = () => {
        let ad = generateAd();
        let vad = validateAd(ad);

        // debug
        console.log(vad);

        return vad;
    };

    const validateAd = (ad) => {
        if (ad.includes('{random}')) {
            ad = ad.replace('{random}', random(1, 4294967295), 'g')
        }

        return ad;
    };

    const random = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const generateAd = () => {
        let ad = ArrayHelper.random(AdList);

        if (lastAd === null) {
            setLastAd(ad);
            return ad;
        }

        if (ad === lastAd) {
            return generateAd();
        }

        setLastAd(ad);
        return ad;
    };

    return (
        <div className="video-container player-responsive" style={{width: '100%'}}>
            <ReactJWPlayer
                playerId='my-unique-id'
                playerScript='/jw/jw.js'
                playlist={ playlistVR }
                isAutoPlay={ true }
                onReady={ onReady }
                onError={(e) => {
                    Snack = enqueueSnackbar('Не удалось загрузить канал :(', {
                        variant: 'error',
                        persist: true,
                    });
                }}
                onVideoLoad={ onVideoLoad }
                onPlaylist={ onPlaylist }
                generatePrerollUrl={ addPreroll }
                advertising={{
                    client:  "googima",
                }}
            />
        </div>
    )
};

Player.defaultProps = {
    snack: null
};

Player.propTypes = {
    snack: PropTypes.instanceOf(WithSnackbarProps)
};

export default Player;
