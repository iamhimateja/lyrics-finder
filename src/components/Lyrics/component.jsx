import React, { Component } from 'react';
import styles from "./style.module.scss";
import { formatTrackDuration } from "../../utils/domUtils";
import PlayIcon from '../../icons/play/component';
import DownloadIcon from '../../icons/download/component';
import CloseIcon from '../../icons/close/component';
import NotFoundIcon from '../../icons/notFound/component';
import HyperLinkIcon from '../../icons/hyperlink/component';

export default class Lyrics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Object.keys(this.props.currentTrack || {}).length > 0) {
      const {
        title: trackTitle,
        duration,
        artist,
        album,
        link: deezerTrackPage
      } = this.props.currentTrack;

      const artistName = artist.name;
      const artistAvatar = artist.picture_big;
      const albumName = album.title;
      const albumCover = album.cover_big;

      const lyricsBlob = new Blob([this.props.currentLyrics], { type: "text/plain" });
      const lyricsDownloadURL = window.URL.createObjectURL(lyricsBlob);

      return (
        <div className={`${styles.lyricsSection} ${this.props.isLyricsOpen ? styles.show : styles.hide}`}>
          <span className={styles.close} onClick={this.props.closeLyrics}><CloseIcon container="container" /></span>
          <div className={styles.selectedTrackInfo}>
            <img src={artistAvatar} className={styles.blurredImg} />
            <div className={styles.albumArt} style={{ backgroundImage: `url('${albumCover}')` }}></div>
            <div className={styles.trackDetails}>
              <span className={styles.trackTitle}>{trackTitle}</span>
              <div className={styles.trackOwnerInfo}>
                <span className={styles.artistTitle}>{artistName}</span> - <span className={styles.albumTitle}>{albumName}</span>
              </div>
              <span className={styles.trackDuration}>{formatTrackDuration(duration)}</span>
              <div className={styles.actions}>
                {/* TODO: WIP - Music player for preview track */}
                <button className={styles.playButton} title="Himateja is working on it...">
                  <PlayIcon container="container" />
                  <span className={styles.btnText}>Play preview</span>
                </button>
                <a href={lyricsDownloadURL} download={`${trackTitle} - ${artistName}.txt`} className={`${styles.downloadButton} ${(this.props.currentLyrics == "") ? styles.disabled : ""}`}>
                  <DownloadIcon container="container" />
                  <span className={styles.btnText}>Download Lyrics</span>
                </a>
                <a href={deezerTrackPage} className={styles.externalLink} target="_blank">
                  <HyperLinkIcon container="container" />
                  Play on Deezer
                </a>
              </div>
            </div>
          </div>
          <div className={styles.lyricsContainer}>
            <div className={`${styles.lyrics} ${(this.props.currentLyrics == "") ? styles.hideLyrics : ""}`}>{this.props.currentLyrics}</div>
            <div className={`${styles.notFound} ${(this.props.currentLyrics == "") ? styles.showNotFound : ""}`}>
              <NotFoundIcon container="container" />
              <span>Sorry, The lyrics you are looking for is not found.</span>
            </div>
          </div>
          <div className={styles.playerContainer}>
            <div className={styles.player}>
              <div className={`${styles.playerAlbumArt} ${styles.playing}`} style={{ backgroundImage: `url('${albumCover}')` }}></div>
              <div className={styles.controls}>

              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${styles.lyricsSection} ${this.props.isLyricsOpen ? styles.show : styles.hide}`}></div>
      );
    }

  }
}
