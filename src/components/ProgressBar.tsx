import { Box, Text } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css'
import { TimeUnit, TextKey } from '@/constants';
import { percentageOfTimeUnit } from '@/utils';

const getFilledBarStyles = (progress: number) => ({
  width: `${progress}%`,
  content: '""',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  backgroundColor: '#adacac',
  boxShadow: 'var(--chakra-shadows-base)',
  borderTopLeftRadius: 'var(--chakra-radii-md)',
  borderBottomLeftRadius: 'var(--chakra-radii-md)',
  borderTopRightRadius: `${progress === 100 ? 'var(--chakra-radii-md)' : 'unset'}`,
  borderBottomRightRadius: `${progress === 100 ? 'var(--chakra-radii-md)' : 'unset'}`,
});

const percentageStyles = {
  zIndex: '1',
  fontSize: '30px',
  color: '#6e6e6e',
  mixBlendMode: 'difference',
}

const progressBarContainerStyles = {
  position: 'relative',
  height: '50px',
  width: '400px',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  fontWeight: 'bold',
  boxShadow: 'var(--chakra-shadows-base)',
  borderRadius: 'var(--chakra-radii-md)',
}

const ProgressBar = ({ unit }: { unit: TimeUnit }) => {
    const progress = percentageOfTimeUnit(unit);

    return (
    <Box sx={progressBarContainerStyles}>
        <Box sx={getFilledBarStyles(progress)} />
        <Box sx={percentageStyles}>{`${progress}%`}</Box>
    </Box>
    );
};

export const ProgressWithTitle = ({ unit }: { unit: TimeUnit }) => {
  let title = TextKey.Today;

  if (unit === TimeUnit.Week) {
    title = TextKey.ThisWeek;
  } else if (unit === TimeUnit.Month) {
    title = TextKey.ThisMonth;
  }

  return (
    <Box>
      <Text fontSize='3xl'>{title}</Text>
      <Box mt="2" mb="6">
        <ProgressBar unit={unit} />
      </Box>
    </Box>
  )
};