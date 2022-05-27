env  GOOS=windows GOARCH=386 go build .
env GOOS=windows GOARCH=386 go build -o RTSPtoWebRTC-amd64.exe .
env GOOS=windows GOARCH=amd64 go build -o RTSPtoWebRTC-amd64.exe .
go build -o RTSPtoWebRTC-darwin .
env GOOS=linux GOARCH=amd64 go build -o RTSPtoWebRTC-linux-amd64 .
zip release.zip ./RTSPtoWebRTC*
rm ./RTSPtoWebRTC*
scp ./release.zip lmh@192.168.2.102:rtspwebrtc/
rm ./release.zip
