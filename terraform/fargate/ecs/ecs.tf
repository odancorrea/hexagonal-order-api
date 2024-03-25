resource "aws_ecs_cluster" "this" {
 name = "lanchonete-api"
}


resource "aws_ecs_task_definition" "this" {
 family                   = "lanchonete-api-task"
 container_definitions    = <<DEFINITION
 [
   {
     "name": "lanchonete-api-task",
     "image": "015024643338.dkr.ecr.sa-east-1.amazonaws.com/lanchonete-api:latest",
     "essential": true,
     "portMappings": [
       {
         "containerPort": 80,
         "hostPort": 80
       }
     ],
     "memory": 1024,
     "cpu": 512
   }
 ]
 DEFINITION
 requires_compatibilities = ["FARGATE"]
 network_mode             = "awsvpc"
 memory                   = 1024
 cpu                      = 512
 execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}


resource "aws_iam_role" "ecsTaskExecutionRole" {
 name               = "ecsTaskExecutionRole2"
 assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}


data "aws_iam_policy_document" "assume_role_policy" {
 statement {
   actions = ["sts:AssumeRole"]


   principals {
     type        = "Service"
     identifiers = ["ecs-tasks.amazonaws.com"]
   }
 }
}


resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
 role       = aws_iam_role.ecsTaskExecutionRole.name
 policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}




resource "aws_ecs_service" "this" {
 name                = "lanchonete-api"
 cluster             = aws_ecs_cluster.this.id
 task_definition     = aws_ecs_task_definition.this.arn
 launch_type         = "FARGATE"
 scheduling_strategy = "REPLICA"
 desired_count       = 2


 load_balancer {
   target_group_arn = aws_lb_target_group.this.arn
   container_name   = aws_ecs_task_definition.this.family
   container_port   = 80
 }


 network_configuration {
   subnets          = [aws_subnet.this["pub_a"].id, aws_subnet.this["pub_b"].id]
   security_groups  = [aws_security_group.this.id]
   assign_public_ip = true
 }


}


resource "aws_security_group" "this" {
 name        = "Terraform-ECS-Zup TASK SG"
 description = "Terraform-ECS-Zup SG"
 vpc_id      = aws_vpc.this.id


 ingress {
   protocol        = "tcp"
   from_port       = 80
   to_port         = 80
   security_groups = [aws_security_group.alb.id]
 }


 egress {
   protocol    = "-1"
   from_port   = 0
   to_port     = 0
   cidr_blocks = ["0.0.0.0/0"]
 }
}