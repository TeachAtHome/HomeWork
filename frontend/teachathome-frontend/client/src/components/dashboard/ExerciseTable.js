import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class App extends Component {

  constructor(props) {
      super(props);
      this.groupID = this.props.groupID;
      this.groupName = this.props.groupName;
  }

  state = {
    homeworkEntryList: []
  };

  componentDidMount() {
    if(this.groupID){
      this.callGetAllEntriesFromGroupApi()
        .then(res => this.setState({ homeworkEntries: res }))
        .catch(err => console.log(err));
      } else {
        this.callGetAllEntriesApi()
          .then(res => this.setState({ homeworkEntries: res }))
          .catch(err => console.log(err));
      }
  }

  callGetAllEntriesFromGroupApi = async () => {
    const response = await fetch("/api/group/" + this.groupID);
    const homeworkEntries = await response.json();
    if (response.status !== 200) throw Error(homeworkEntries.message);
    return homeworkEntries;
  };

  callGetAllEntriesApi = async () => {
    const response = await fetch("/api/document");
    const homeworkEntries = await response.json();
    console.log("Entries", homeworkEntries);
    if (response.status !== 200) throw Error(homeworkEntries.message);
    return homeworkEntries;
  };

  render() {
    console.log("test", this.state.homeworkEntryList);
    return (
      <div style={tableStyle}>
        <MaterialTable
          icons={tableIcons}
          title={this.props.tableName}
          columns={[
            { title: 'Titel', field: 'title' },
            { title: 'Klasse', field: 'group' },
            { title: 'Anfangsdatum', field: 'startDate' },
            { title: 'Enddatum', field: 'endDate' },
            { title: 'Abgaben', field: 'submissions' }
          ]}
          data={this.state.homeworkEntryList}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* const data = this.state.data;
                            data.push(newData);
                            this.setState({ data }, () => resolve()); */
                  }
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* const data = this.state.data;
                            const index = data.indexOf(oldData);
                            data[index] = newData;
                            this.setState({ data }, () => resolve()); */
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* let data = this.state.data;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            this.setState({ data }, () => resolve()); */
                  }
                  resolve();
                }, 1000);
              })
          }}
        />
      </div>
    );
  }
}

const tableStyle = {
  margin: 32
};
