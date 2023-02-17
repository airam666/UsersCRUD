import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import EditEmployeeModal from './EditEmployeeModal';

class App extends Component {
  state = {
    employee: [],
    isAddEmployeeModalOpen: false,
    isEditEmployeeModalOpen: false,
    isDeleteEmployeeModalOpen: false,
    loading: false,
    errorMessage: '',
    selectedEmployee: {},
    inputText: '',
    filteredData: [],
  };

  componentDidMount() {
    this.getData();
  }

  convertToObbjs = arr => {
    const clientObjects = arr.map(
      ([
        id,
        cliente,
        nombre,
        direc,
        ciudad,
        telefono,
        rifci,
        email,
        repre,
        tipo,
        vsaldo,
        csaldo,
        formap,
        numfa,
        numdev,
      ]) => ({
        id,
        cliente,
        nombre,
        direc,
        ciudad,
        telefono,
        rifci,
        email,
        repre,
        tipo,
        vsaldo,
        csaldo,
        formap,
        numfa,
        numdev,
      }),
    );
    return clientObjects;
  };

  inputHandler = e => {
    var lowerCase = e.nativeEvent.text.toString().toLowerCase();
    if (lowerCase === '') {
      console.log('NO DATA INPUT');
    }
    let match = this.state.employee?.filter(el =>
      el.nombre.toLowerCase().includes(lowerCase),
    );
    this.setState({
      filteredData: match ?? this.state.employee,
    });
  };

  getData = () => {
    this.setState({errorMessage: '', loading: true});
    fetch(
      'http://drocerca.proteoerp.org:8085/prueba1/sincro/dispmoviles/transmitir/scli',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          employee: this.convertToObbjs(res),
          filteredData: this.convertToObbjs(res),
          loading: false,
          errorMessage: '',
        }),
      )
      .catch(() =>
        this.setState({
          loading: false,
          errorMessage: 'Network Error. Please try again.',
        }),
      );
  };

  toggleEditEmployeeModal = () => {
    this.setState({
      isEditEmployeeModalOpen: !this.state.isEditEmployeeModalOpen,
    });
  };

  updateEmployee = data => {
    // updating employee data with updated data if employee id is matched with updated data id
    this.setState({
      employee: this.state.employee.map(emp =>
        emp.id == data.id ? data : emp,
      ),
    });
  };

  render() {
    const {
      loading,
      errorMessage,
      employee,
      isEditEmployeeModalOpen,
      selectedEmployee,
      userDataList,
      filteredData,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            id="outlined-basic"
            onChange={this.inputHandler}
            isFocused="true"
            fullWidth
            label="Search"
            placeholder="Search"
            style={{
              marginInline: 30,
              borderRadius: 5,
              backgroundColor: '#FEEEEE',
            }}
          />

          <Text style={styles.title}>Employee Lists:</Text>
          {filteredData?.map((data, index) => (
            <View style={styles.employeeListContainer} key={data.id}>
              <Text style={{...styles.listItem, color: 'tomato'}}>
                {index + 1}.
              </Text>
              <Text style={styles.name}>{data.employee_name}</Text>
              <Text style={styles.listItem}>name: {data.nombre}</Text>
              <Text style={styles.listItem}>address: {data.direc}</Text>
              <Text style={styles.listItem}>e-mail: {data.email}</Text>
              <Text style={styles.listItem}>phone: {data.telefono}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleEditEmployeeModal();
                    this.setState({selectedEmployee: data});
                  }}
                  style={{...styles.button, marginVertical: 0}}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {loading ? (
            <Text style={styles.message}>Please Wait...</Text>
          ) : errorMessage ? (
            <Text style={styles.message}>{errorMessage}</Text>
          ) : null}

          {/* EditEmployeeModal modal is open when edit button is clicked in particular employee list*/}
          {isEditEmployeeModalOpen ? (
            <EditEmployeeModal
              isOpen={isEditEmployeeModalOpen}
              closeModal={this.toggleEditEmployeeModal}
              selectedEmployee={selectedEmployee}
              updateEmployee={this.updateEmployee}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  employeeListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});
