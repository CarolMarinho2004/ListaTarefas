import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = () => {
    if (tarefa.trim()) {
      setTarefas([...tarefas, { chave: Math.random().toString(), nome: tarefa, concluida: false }]);
      setTarefa('');
    }
  };

  const removerTarefa = (chaveTarefa) => {
    setTarefas(tarefas.filter(tarefa => tarefa.chave !== chaveTarefa));
  };

  const alternarTarefaConcluida = (chaveTarefa) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.chave === chaveTarefa ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.cabecalho}>Lista de Tarefas</Text>
      <View style={estilos.containerEntrada}>
        <TextInput
          placeholder="Digite uma tarefa"
          style={estilos.entrada}
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity onPress={adicionarTarefa}>
          <Icon name="add" size={30} color="green" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <View style={estilos.containerTarefa}>
            <Text style={[estilos.tarefa, item.concluida && estilos.tarefaConcluida]}>
              {item.nome}
            </Text>
            <View style={estilos.icones}>
              <TouchableOpacity onPress={() => alternarTarefaConcluida(item.chave)}>
                <Icon
                  name={item.concluida ? "check-circle" : "radio-button-unchecked"}
                  size={30}
                  color={item.concluida ? "green" : "gray"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removerTarefa(item.chave)}>
                <Icon name="delete" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  cabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerEntrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  entrada: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  containerTarefa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tarefa: {
    fontSize: 18,
  },
  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  icones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});