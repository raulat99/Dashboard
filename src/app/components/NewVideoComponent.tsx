import React, { Component } from 'react';
import VideoPlayer from 'react-video-player-extended';

export default class NewVideoComponent extends Component {
  state = {
    isPlaying: false,
    volume: 0.7
  };

  handlePlay = () => {
    this.setState({isPlaying: true});
  };

  handlePause = () => {
    this.setState({isPlaying: false});
  };

  handleVolume = (value : any) => {
    this.setState({volume: value});
  };

  render () {
    const {isPlaying, volume} = this.state;

    return <VideoPlayer
      url="//vjs.zencdn.net/v/oceans.mp4"
      isPlaying={isPlaying}
      volume={volume}
      onPlay={this.handlePlay}
      onPause={this.handlePause}
      onVolume={this.handleVolume}
     />
  }
}