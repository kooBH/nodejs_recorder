/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
const videoElement = document.querySelector("video");
const audioElement = document.querySelector("audio");
const audioSelect = document.querySelector("select#audioSource");
const videoSelect = document.querySelector("select#videoSource");

const channels = document.querySelector("channels");
const samplerate = document.querySelector("samplerate");

navigator.mediaDevices
  .enumerateDevices()
  .then(gotDevices)
  .then(getStream)
  .catch(handleError);

audioSelect.onchange = getStream;
//videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    console.log(deviceInfo);
    const option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "audioinput") {
      option.text =
        deviceInfo.label || "microphone " + (audioSelect.length + 1);
      audioSelect.appendChild(option);
      console.log("audioinput : ", deviceInfo.label)
    } else if (deviceInfo.kind === "videoinput") {
      //option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
      //videoSelect.appendChild(option);
      console.log("videoinput : ", option.text);
    } else {
      console.log("audiooutput: ", deviceInfo.label);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  // Get Device based on label
  const constraints = {
    audio: {
      //deviceId: { exact: audioSelect.value },
      label: { exact: audioSelect.value },
    },
    /*
    video: {
      //deviceId: { exact: videoSelect.value },
      label: { exact: videoSelect.value },
    },
    */
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  //videoElement.srcObject = stream;
  audioElement.srcObject = stream;
  console.log("gotStream() : ",audioElement," = ",stream);
}

function handleError(error) {
  console.error("Error: ", error);
}


//document.querySelector('#showVideo').addEventListener('click', e => init(e));