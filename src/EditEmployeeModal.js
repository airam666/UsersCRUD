import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: '',
      nombre: '',
      direc: '',
      email: '',
      telefono: '',
      loading: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    // state value is updated by selected employee data
    const {cliente, nombre, direc, email, telefono, loading} =
      this.props.selectedEmployee;
    this.setState({
      cliente: cliente,
      nombre: nombre,
      direc: direc,
      email: email,
      telefono: telefono,
      loading: false,
      errorMessage: '',
    });
  }

  handleChange = (value, state) => {
    this.setState({[state]: value});
  };

  updateEmployee = () => {
    // destructure state
    const {cliente, nombre, direc, email, telefono} = this.state;
    this.setState({errorMessage: '', loading: true});

    if (cliente || nombre || direc || telefono || email) {
      // selected employee is updated with employee id
      alert(
        JSON.stringify({
          id: this.state.id,
          cliente: this.state.cliente,
          nombre: this.state.nombre,
          direc: this.state.direc,
          ciudad: this.state.ciudad,
          telefono: this.state.telefono,
          rifci: this.state.rifci,
          email: this.state.email,
          repre: this.state.repre,
          tipo: this.state.tipo,
          vsaldo: this.state.vsaldo,
          csaldo: this.state.csaldo,
          formap: this.state.formap,
          numfa: this.state.numfa,
          numdev: this.state.numdev,
        }),
      );
    }
  };

  render() {
    const {isOpen, closeModal} = this.props;
    const {errorMessage, loading, nombre, direc, email, telefono} = this.state;
    return (
      <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Update Employee</Text>

          <TextInput
            value={nombre}
            style={styles.textBox}
            onChangeText={text => this.handleChange(text, 'name')}
            placeholder="Full Name"
          />

          <TextInput
            defaultValue={direc}
            style={styles.textBox}
            onChangeText={text => this.handleChange(text, 'address')}
            placeholder="address"
          />
          <TextInput
            defaultValue={email}
            textContentType={'emailAddress'}
            style={styles.textBox}
            onChangeText={text => this.handleChange(text, 'email')}
            placeholder="email"
          />

          <TextInput
            value={telefono}
            keyboardType="numeric"
            style={styles.textBox}
            onChangeText={text => this.handleChange(text, 'phone')}
            placeholder="phone"
          />

          {loading ? (
            <Text style={styles.message}>Please Wait...</Text>
          ) : errorMessage ? (
            <Text style={styles.message}>{errorMessage}</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.updateEmployee}
              style={{...styles.button, marginVertical: 0}}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
              style={{
                ...styles.button,
                marginVertical: 0,
                marginLeft: 10,
                backgroundColor: 'tomato',
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default EditEmployeeModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  message: {
    color: 'tomato',
    fontSize: 17,
  },
});
