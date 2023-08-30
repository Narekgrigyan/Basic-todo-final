export const projectsConverter = {
    toFirestore(post) {
      return { ...post };
    },
    fromFirestore(
      snapshot,
      options
    ) {
      const data = snapshot.data(options);
      return {
        author: data.author,
        name: data.name,
        id: snapshot.id,
        _ref: snapshot.ref,
        image: data.image,
        date: data.date
      };
    },
  };