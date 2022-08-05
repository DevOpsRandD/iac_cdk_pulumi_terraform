terraform {
  required_providers {
    aws = {
      version = "~> 4.20.0"
    }
  }
  required_version = "~> 1.2.2"
  backend "s3" {
    bucket = "terraform-state-rand"
    key    = "state"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}