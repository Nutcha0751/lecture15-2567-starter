"use client";

import TermsAndCondsModal from "@components/TermsAndCondsModal";
import { useDisclosure } from "@mantine/hooks";
import { runningPlans } from "@lib/runningPlans";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Radio,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod"

//create Zod schema for validations
const schema = z.object({
  firstName: z.string().min(3, { message: 'First name must have at least 3 chars' }),
  lastName: z.string().min(3, { message: 'Last name must have at least 3 chars' }),
  email: z.string().email({ message: 'Email must have at least'}),
  plan: z.enum(['funrun', 'mini', 'half', 'full'], {message: 'Please select a plan'}),
  gender: z.enum(['male', 'female'], {message: 'Please select a gender'}),
  acceptTermsAndConds: z.literal(true, {
    errorMap: () => ({message: 'Please accept terms and conditions'}),
  }),
})

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { //เป็นการกำหนดค่าเริ่มต้น
      firstName: "",
      lastName: "",
      email: "",
      plan: null,
      gender: null,
      acceptTermsAndConds: false,
    },
    validate: zodResolver(schema)
  });

  console.log(form.values);

  return (
    <div>
      <Container size="500px">
        <Space h="lg" />
        <Title fs="italic" ta="center">
          Register CMU Marathon 🥈
        </Title>
        <Space h="lg" />

        {/*add form*/}
        <form onSubmit = {form.onSubmit((values) => console.log(values))}>

        <Stack gap="sm">
          <Group grow align="start">
            <TextInput label="First Name" {...form.getInputProps('firstName')}/>
            <TextInput label="Last Name" {...form.getInputProps('lastName')}/>
          </Group>
          <TextInput label="Email" {...form.getInputProps('email')}/>
          <Select
            label="Plan"
            data={runningPlans}
            placeholder="Please select plan..."
            {...form.getInputProps('plan')}
          />
          <Space />
          <Radio.Group label="Gender" {...form.getInputProps('gender')}>
            <Radio value="male" label="Male 👨" mb="xs" />
            <Radio value="female" label="Female 👧" />
          </Radio.Group>
          <Space />
          <Checkbox
          {...form.getInputProps('acceptTermsAndConds')}
            label={
              <Text>
                I accept{" "}
                <Anchor onClick={open} href="#">
                  terms and conditions
                </Anchor>
              </Text>
            }
          />
          <Button type="submit">Register</Button>
        </Stack>

        </form>

      </Container>

      <TermsAndCondsModal opened={opened} close={close} />
    </div>
  );
}
