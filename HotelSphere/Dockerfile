FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
# IMPORTANT: Ensure this matches the jar name in your target folder
CMD ["java", "-jar", "target/springboot_backend_template-0.0.1.jar"]