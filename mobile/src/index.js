import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  // state that will store the values for projects
  const [projects, setProjects] = useState([]);

  // useEffect that will get the projects from the api and store it projects via setProjects()
  useEffect(() => {
    api.get("projects").then((response) => {
      console.log(response.data);

      setProjects(response.data);
    });
  }, []);

  // function responsible for adding projects when the button add project is clicked
  async function handleAddProject() {
    const response = await api.post("projects", {
      title: "Nando's mobile project",
      owner: "Fernando",
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>" Hello :): "</Text>

        <FlatList
          data={projects}
          keyExtractor={(project) => {
            project.id;
          }}
          // the anonymous function takes item as each item from the project array
          renderItem={({ item: project }) => (
            <Text style={styles.project}> {project.title} </Text>
          )}
        />

        {/* to display the projects - BEFORE FLATLIST was explained */}
        {/* {projects.map((project) => (
          <Text key={project.id} style={styles.project}>
            {project.title}
          </Text>
        ))} */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Add Project</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7150c1",
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  project: {
    color: "#FFF",
    fontSize: 30,
  },

  button: {
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
