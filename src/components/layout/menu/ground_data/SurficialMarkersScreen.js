import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ImageStyle } from '../../../../styles/image_style'
import { ContainerStyle } from '../../../../styles/container_style'
import { InputStyle } from '../../../../styles/input_style';
import { LabelStyle } from '../../../../styles/label_style';
import { ButtonStyle } from '../../../../styles/button_style';
import { DataTable } from 'react-native-paper';

export default class SurficialMarkersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={ContainerStyle.content}>
          <View style={ContainerStyle.datatable_content}>
            <ScrollView horizontal={true}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{ width: 150 }}>Date</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>A</DataTable.Title>
                  <DataTable.Title style={{ width: 200 }}>B</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>C</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Weather</DataTable.Title>
                  <DataTable.Title style={{ width: 150 }}>Nagsukat</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onPress={() => {
                  this.selectCell()
                }}>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>2</DataTable.Cell>
                  <DataTable.Cell style={{ width: 200 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                  <DataTable.Cell style={{ width: 150 }}>Sample data</DataTable.Cell>
                </DataTable.Row>

              </DataTable>
            </ScrollView>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => { console.log(page); }}
              label="1-2 of 6"
            />
          </View>
          <View>
            <Text style={[LabelStyle.small_label, LabelStyle.brand]}>* Click row to modify.</Text>
          </View>
          <View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Date</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>A</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>B</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>C</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Weather</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
            </View>
            <View style={ContainerStyle.input_label_combo}>
              <Text style={LabelStyle.medium_label}>Nagsukat</Text>
              <TextInput style={[InputStyle.medium, InputStyle.default, InputStyle.black]}></TextInput>
            </View>
            <View style={{ paddingTop: '10%', alignItems: 'center' }}>
              <TouchableOpacity style={ButtonStyle.medium}>
                <Text style={ButtonStyle.large_text}>Add +</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
