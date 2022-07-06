import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Image,
  View,
  Pressable,
} from 'react-native';
import Container from '../../components/Container';
import CenterContainer from '../../components/Container/CenterContainer';
import {QUESTIONS} from '../../components/Navigation/ProfileNavigator';
import {BodyCopy, Subtitle} from '../../components/Typography';
import colors from '../../utils/colors';
import {
  Category,
  GetCategoriesQueryData,
  GET_CATEGORIES_QUERY,
} from './Categories.graphql';
import styles from './Categories.styles';

const CategoryCard = ({
  category,
  onPress,
}: {
  category: Category;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.categoryContainer}>
        <Image
          source={{uri: category.image}}
          style={styles.categoryImage}
          resizeMode="contain"
        />
        <View style={styles.categoryContent}>
          <BodyCopy style={styles.categoryTitle}>{category.title}</BodyCopy>
          <BodyCopy style={styles.categoryDescription}>
            {category.description}
          </BodyCopy>
        </View>
      </View>
    </Pressable>
  );
};

export default () => {
  const {loading, error, data} =
    useQuery<GetCategoriesQueryData>(GET_CATEGORIES_QUERY);

  const navigation = useNavigation();

  if (loading) {
    return (
      <CenterContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </CenterContainer>
    );
  }

  if (error) {
    return (
      <CenterContainer>
        {/* TODO: Proper error handling */}
        <Subtitle>{`Error: ${error.message}`}</Subtitle>
      </CenterContainer>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Container>
        <View style={styles.categoriesContainer}>
          {data &&
            data.getCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() =>
                  // @ts-ignore
                  navigation.navigate(QUESTIONS, {
                    title: category.title,
                    categoryId: category.id,
                  })
                }
              />
            ))}
        </View>
      </Container>
    </ScrollView>
  );
};
