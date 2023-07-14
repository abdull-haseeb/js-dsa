# Load required libraries
library(ggplot2)
library(dplyr)
library(cluster)

# Read the data
data <- read.csv("customer-data.csv")

# Select the relevant features for segmentation
features <- data[, c("Age", "Income", "SpendingScore")]

# Scale the features
scaled_features <- scale(features)

# Perform k-means clustering
k <- 5  # Number of clusters
set.seed(123)  # Set seed for reproducibility
kmeans_result <- kmeans(scaled_features, centers = k)

# Add cluster labels to the original data
data$Cluster <- as.factor(kmeans_result$cluster)

# Visualize the clusters
ggplot(data, aes(x = Income, y = SpendingScore, color = Cluster)) +
  geom_point(size = 4) +
  labs(x = "Income", y = "Spending Score", title = "Customer Segmentation") +
  theme_minimal()
