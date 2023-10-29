FROM maven as build


COPY . . 

RUN mvn package

FROM openjdk:17


COPY --from=build /target/spring_mvc_github_oauth-0.0.1-SNAPSHOT.jar spring_mvc_github_oauth.jar



EXPOSE 8080


ENTRYPOINT ["java", "-jar", "spring_mvc_github_oauth.jar"]