locals {


 subnet_ids = { for k, v in aws_subnet.this : v.tags.Name => v.id }


 common_tags = {
   Project   = "ECS Fargate"
   CreatedAt = "2024-03-18"
   ManagedBy = "Danilo Correa"
   Owner     = "Danilo Correa"
   Service   = "ECS Fargate"
 }
}