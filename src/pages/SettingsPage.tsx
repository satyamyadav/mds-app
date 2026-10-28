import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  Heading,
  Text,
  Divider,
  Label,
  Switch,
  Checkbox,
  Dropdown,
  Button,
} from '@innovaccer/design-system';
import { Page } from '../components/app/Page';
import { toast } from '../store/useToastStore';

// Starter page: single-task composition — one Card, sections split by Divider,
// Cancel + one primary action in the footer. Copy this file to start a new page.

type NotificationPreferences = {
  email: boolean;
  sms: boolean;
  newPatientAssigned: boolean;
  careGapOpened: boolean;
  referralUpdated: boolean;
  digest: string;
};

const defaultValues: NotificationPreferences = {
  email: true,
  sms: false,
  newPatientAssigned: true,
  careGapOpened: true,
  referralUpdated: false,
  digest: 'daily',
};

const channelOptions = [
  { name: 'email', label: 'Email' },
  { name: 'sms', label: 'Text message (SMS)' },
] as const;

const alertOptions = [
  { name: 'newPatientAssigned', label: 'A patient is assigned to me' },
  { name: 'careGapOpened', label: 'A care gap opens for one of my patients' },
  { name: 'referralUpdated', label: 'A referral I sent changes status' },
] as const;

const digestOptions = [
  { label: 'Send each alert right away', value: 'instant' },
  { label: 'Daily summary at 8:00 AM', value: 'daily' },
  { label: 'Weekly summary on Monday', value: 'weekly' },
];

export function SettingsPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<NotificationPreferences>({ defaultValues });

  const onSubmit = (data: NotificationPreferences) => {
    // Prototype only: keep values locally. Swap for a mutation hook when there's an API.
    reset(data);
    toast.add({ title: 'Notification preferences saved', appearance: 'success' });
  };

  return (
    <Page>
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading size="m">Notifications</Heading>
          <Text appearance="subtle">Choose how and when you hear about your patients.</Text>

          <Divider className="my-6" />

          <Heading size="s" className="mb-4">
            Channels
          </Heading>
          {channelOptions.map((option) => (
            <div key={option.name} className="d-flex align-items-center mb-4">
              <Controller
                name={option.name}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch
                    name={option.name}
                    checked={value}
                    onChange={(_e: unknown, checked: boolean) => onChange(checked)}
                  />
                )}
              />
              <Label className="ml-4">{option.label}</Label>
            </div>
          ))}

          <Divider className="my-6" />

          <Heading size="s" className="mb-4">
            Alerts
          </Heading>
          {alertOptions.map((option) => (
            <Controller
              key={option.name}
              name={option.name}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  className="mb-4"
                  name={option.name}
                  label={option.label}
                  checked={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
                />
              )}
            />
          ))}

          <Divider className="my-6" />

          <Heading size="s" className="mb-4">
            Frequency
          </Heading>
          <div className="w-50">
            <Label withInput>Delivery</Label>
            <Controller
              name="digest"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  options={digestOptions}
                  selected={digestOptions.filter((o) => o.value === value)}
                  onChange={(selected: string) => onChange(selected)}
                />
              )}
            />
          </div>

          <Divider className="my-6" />

          <div className="d-flex justify-content-end">
            <Button
              styleType="outlined"
              type="button"
              className="mr-4"
              onClick={() => reset()}
              disabled={!isDirty}
            >
              Cancel
            </Button>
            <Button type="submit" appearance="primary" disabled={!isDirty}>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </Page>
  );
}
