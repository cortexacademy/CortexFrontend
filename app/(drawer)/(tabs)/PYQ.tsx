import { Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function PYQ() {
  const { appTheme } = useTheme();

  return (
    <View className="flex-1 p-4 justify-center" style={{ backgroundColor: appTheme.colors.background }}>
      {/* PYT Card */}
      <View className="border-2 rounded-lg p-4 w-full" style={{ borderColor: appTheme.colors.primary, backgroundColor: appTheme.colors.secondaryBackground }}>
        <Text className="text-2xl font-bold" style={{ color: appTheme.colors.text }}>Previous Year Topic</Text>
        <Text className="mt-2" style={{ color: appTheme.colors.mutedText }}>Revise cardinal points before the exam.</Text>
        <Text className="italic" style={{ color: appTheme.colors.textSecondary }}>#Cortex Creative Minds</Text>
      </View>

      {/* PYQ Card */}
      <View className="border-2 rounded-lg p-4 w-full mt-8" style={{ borderColor: appTheme.colors.primary, backgroundColor: appTheme.colors.secondaryBackground }}>
        <Text className="text-2xl font-bold" style={{ color: appTheme.colors.text }}>Previous Year Q</Text>
      </View>

      {/* G.T. Section */}
      <View className="mt-8 flex items-center">
        <Text className="text-lg font-bold" style={{ color: appTheme.colors.errorText }}>G.T ➔ Will be Updated Shortly.</Text>
      </View>
    </View>
  );
}
