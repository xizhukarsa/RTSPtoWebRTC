const initWebRTC = (videoNode, suuid) => {
  let stream = new MediaStream();
  console.log(suuid);
  console.log(videoNode);
  // let suuid = $('#suuid').val();

  const pc = new RTCPeerConnection();

  pc.onnegotiationneeded = async () => {
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    $.post("../receiver/"+ suuid, {
      suuid: suuid,
      data: btoa(pc.localDescription.sdp)
    }, function(data) {
      try {
        pc.setRemoteDescription(new RTCSessionDescription({
          type: 'answer',
          sdp: atob(data)
        }))
      } catch (e) {
        console.warn(e);
      }
    });
  };

  pc.ontrack = function(event) {
    stream.addTrack(event.track);
    videoNode.srcObject = stream;
    console.log(event.streams.length + ' track is delivered')
  }

  $(document).ready(function() {
    $.get("../codec/" + suuid, function(data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.log(e);
      } finally {
        $.each(data,function(index,value){
          pc.addTransceiver(value.Type, {
            'direction': 'sendrecv'
          })
        })
      }
    });
  });
};

initWebRTC(document.querySelector('#videoElem'), 'H264_AAC');
initWebRTC(document.querySelector('#videoElem1'), 'H264_AAC1');
// initWebRTC(document.querySelector('videoElem1', 'H264_AAC1'));