import { Center, Flex, Loader } from "@mantine/core";

export default function LoadingSkeleton() {
  return (
    <Flex h={"90vh"} w={"100%"} m={0} p={0} align={"center"} justify={"center"}>
      <Center>
        <Loader color="cyan" />
      </Center>
    </Flex>
  );
}
