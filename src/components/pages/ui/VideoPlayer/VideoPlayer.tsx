import { useState, type FC, useEffect } from 'react';
import objStyle from './VideoPlayer.module.css';
import classNames from 'classnames';

export const VideoPlayer: FC<{ filmId: string | undefined }> = ({ filmId }) => {
    const [scriptHtml, setScriptHtml] = useState<string>('');

    useEffect(() => {
        if (!filmId) return;
        setScriptHtml('');
        const dataUrl = window.location.origin + `/movie/${filmId}`;

        fetch(
            `//js.espanplay.site/get_player?w=610&h=370&type=widget&kp_id=${filmId}&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=` +
                dataUrl,
        )
            .then(res => res.text())
            .then(data => {
                const matches = data.match(/<iframe.*<\/iframe>/gm);
                if (matches && matches.length > 0) {
                    setScriptHtml(matches[0]);
                }
            })
            .catch(err => {
                console.error('Player load error', err);
                setScriptHtml('');
            });
    }, [filmId]);
    return (
        <div
            className={classNames(objStyle.uitools)}
            id="videoplayers"
            dangerouslySetInnerHTML={{ __html: scriptHtml }}
        ></div>
    );
};
