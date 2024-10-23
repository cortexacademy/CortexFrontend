import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';
import { Card } from '@/components/common/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'nativewind';

export default function PYQ() {
  const { appTheme } = useTheme();

  const handleNavigateToSubjects = (type: 'topics' | 'quiz') => {
    router.push({
      pathname: '/pyq/exam',
      params: { type },
    });
  };

  return (
    <View className="flex-1 p-4 justify-center" style={{ backgroundColor: appTheme.colors.quaternary }}>
      <LinearGradient
        colors={[appTheme.colors.primary, appTheme.colors.secondary]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.roundedGradient}
      >
        <View className="flex h-full">
          <View >
            <Text className="text-2xl font-semibold" style={{ alignSelf: 'center', color: appTheme.colors.white }}>
              Previous Year Topics
            </Text>
            <View style={{ height: 1, backgroundColor: appTheme.colors.tertiary, marginTop: 8 }} />
          </View>

          <View style={{ padding: 8, borderRadius: 4 }} className='mt-2 mb-4'>
            <Text className="text-base" style={{ color: appTheme.colors.white }}>
              Revise key topics covered in previous years. These will help in building a solid foundation
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleNavigateToSubjects('topics')}
            style={{ backgroundColor: appTheme.colors.tertiary, padding: 10, borderRadius: 8, alignSelf: 'center', width: '90%' }}
            activeOpacity={0.7}
          >
            <Text className='text-lg' style={{ color: appTheme.colors.primary, alignSelf: 'center' }}>Learn</Text>
          </TouchableOpacity>

          {/* <Text className="text-sm italic mt-2" style={{ color: appTheme.colors.quaternary }}>
            #Cortex Creative Minds
          </Text> */}
        </View>
      </LinearGradient>

      <LinearGradient
        colors={[appTheme.colors.primary, appTheme.colors.secondary]}
        start={{ x: 0.4, y: 0.8 }}
        end={{ x: 0, y: 1 }}
        className='mt-4'
        style={styles.roundedGradient}
      >
        <View className="flex h-full">
          <View>
            <Text className="text-2xl font-semibold" style={{ alignSelf: 'center', color: appTheme.colors.white }}>
              Previous Year Questions
            </Text>
            <View style={{ height: 1, backgroundColor: appTheme.colors.tertiary, marginTop: 8 }} />
          </View>

          <View style={{ padding: 8, borderRadius: 4 }} className='mt-2 mb-4'>
            <Text className="text-base" style={{ color: appTheme.colors.white }}>
              Practice the actual questions from previous exams. This will give you insights into question.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleNavigateToSubjects('quiz')}
            style={{ backgroundColor: appTheme.colors.tertiary, padding: 10, borderRadius: 8, alignSelf: 'center', width: '90%' }}
            activeOpacity={0.7}
          >
            <Text className='text-lg' style={{ color: appTheme.colors.primary, alignSelf: 'center' }}>Solve</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View
        className="mt-8 p-4 items-center rounded-lg"
        style={{
          borderColor: appTheme.colors.lightgray,
          borderWidth: 2,
          backgroundColor: appTheme.colors.midgray,
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
          opacity: 0.6
        }}
      >
        <Text className="text-lg font-bold" style={{
          color: appTheme.colors.darkgray,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
          G.T ➔ Will be Updated Shortly.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  roundedGradient: {
    borderRadius: 8,
    height: 220,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
});