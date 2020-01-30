import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { List, ListItem } from 'react-native-elements'
import AppConfig from '../../../../reducers/AppConfig';
import RNFetchBlob from 'rn-fetch-blob';
import FilePickerManager from 'react-native-file-picker';
import RNFS from 'react-native-fs';

function CommunityRiskAssessmentScreen() {
  const [list, setList] = useState([])
  const [selectedFilename, setSelectedFilename] = useState("");
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [filename, setFilename] = useState("None");
  const [filepath, setFilepath] = useState();
  const [filetype, setFiletype] = useState();
  const [filesize, setFilesize] = useState();

  useEffect(() => {
    initList()
  }, [])

  const initList = () => {
    fetch(`${AppConfig.HOSTNAME}/api/cra/community_risk_assessment/fetch`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "path": `${AppConfig.MARIRONG_DIR}/DOCUMENTS/`
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == true) {
          setList(responseJson.data);
        } else {
          setList([{ filename: 'NO FILES AVAILABLE', filepath: 'N/A' }])
        }
      })
      .catch((error) => {
        console.log(error);
      }
      );
  }

  const downloadFile = (full_path,file_name) => {
    const HTTP_URL = full_path.replace('/var/www/html', '');
    let dirs = RNFetchBlob.fs.dirs
    RNFetchBlob.config({
      path : dirs.DocumentDir+ '/'+ file_name,
      fileCache : true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        description: 'File downloaded by download manager.'
      }
    })
      .fetch('GET', `${AppConfig.HOST_DIR}${HTTP_URL}`)
      .then((res) => {
        ToastAndroid.show(`The file saved to ${res.path()}`, ToastAndroid.LONG);
      })
  }

  const uploadFile = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        setFilepath(response.path);
        setFiletype(response.type);
        setFilesize(response.size);
        setFilename(response.fileName);
        setConfirmUpload(true);
      }
    });
  }

  const comfirmUpload = () => {
    var uploadBegin = (response) => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = (response) => {
      var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    RNFS.uploadFiles({
      toUrl: `${AppConfig.HOSTNAME}/api/cra/community_risk_assessment/upload`,
      files: [{
        name: 'resource',
        filename:filename,
        filepath: filepath,
        filetype: filetype,
        filesize: filesize
      }],
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      fields: {
        'hello': 'world',
      },
      begin: uploadBegin,
      progress: uploadProgress
    }).promise.then((response) => {
      setTimeout(()=> {
        if (response.statusCode == 200) {
          ToastAndroid.show('File successfully uploaded!', ToastAndroid.LONG);
          initList()
        } else {
          console.log('SERVER ERROR');
        }
      }, 2000)
    })
      .catch((err) => {
        if (err.description === "cancelled") {
          // cancelled by user
        }
        console.log(err);
      });
  }

  return (
    <Fragment>
      <View style={ContainerStyle.content}>
        <Text style={[LabelStyle.large_label, LabelStyle.brand]}>Community Risk Assessment</Text>
        <Text style={[LabelStyle.small_label, LabelStyle.brand]}>Reports and Documents</Text>
        <List containerStyle={{ backgroundColor: 'transparent', marginBottom: 20, flex: 0.9 }}>
          {
            list.map((l) => (
              <TouchableOpacity key={l.file_path + l.filename} onPress={() => {
                downloadFile(l.file_path+l.filename, l.filename);
              }}>
                <ListItem
                  key={l.filename}
                  title={l.filename}
                  subtitle={l.file_path}
                  hideChevron={true}
                />
              </TouchableOpacity>
            ))
          }
        </List>
        <View style={{ paddingTop: '10%', alignItems: 'center' }}>
          <Text style={[LabelStyle.medium_label, LabelStyle.brand]}>Selected file: {filename}</Text>
          {confirmUpload ?
            <TouchableOpacity style={ButtonStyle.medium} onPress={() => { comfirmUpload() }}>
              <Text style={ButtonStyle.large_text}>Confirm Upload</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={ButtonStyle.medium} onPress={() => { uploadFile() }}>
              <Text style={ButtonStyle.large_text}>Upload file</Text>
            </TouchableOpacity>}
        </View>
      </View>
    </Fragment>
  );
}

export default CommunityRiskAssessmentScreen;