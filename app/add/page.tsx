"use client";
import { Paper, Group, Center, Tabs, Text } from "@mantine/core";

export default function Add() {
  return (
    <Paper>
      <Group gap={0}>
        <Paper w={"50%"}>
          <Center>
            <h2>Image</h2>
          </Center>
        </Paper>
        <Paper w={"50%"}>
          <Tabs defaultValue={"automatic"}>
            <Tabs.List>
              <Tabs.Tab value="automatic">Automatic</Tabs.Tab>
              <Tabs.Tab value="manual">Manual</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="automatic"><Text>Automatic</Text></Tabs.Panel>
            <Tabs.Panel value="manual"><Text>Manual</Text></Tabs.Panel>
          </Tabs>
        </Paper>
      </Group>
    </Paper>
  );
}
