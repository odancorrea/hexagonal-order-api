provider "aws" {
  region = "sa-east-1"
}

resource "aws_db_instance" "default" {
  allocated_storage    = 5
  storage_type         = "gp2"
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  db_name              = "lanchonete"
  username             = local.postgres_username
  password             = local.postgres_password
  final_snapshot_identifier = "pgsql-snapshot"

  vpc_security_group_ids = [aws_security_group.instance.id]

  tags = {
    Name = "lanchonete"
  }
}

resource "aws_security_group" "instance" {
  name = "terraform-example-instance"
  
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "address" {
  description = "The address to connect to the DB instance."
  value       = aws_db_instance.default.address
}

output "arn" {
  description = "The ARN of the DB instance."
  value       = aws_db_instance.default.arn
}
