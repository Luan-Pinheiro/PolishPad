#!/bin/bash

# PolishPad Docker Compose Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker and Docker Compose are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Dependencies check passed"
}

# Function to start all services
start_services() {
    print_status "Starting PolishPad services..."
    docker-compose up -d
    
    print_status "Waiting for services to be ready..."
    sleep 10
    
    # Check if Ollama is ready and pull the model if needed
    print_status "Checking Ollama status and ensuring Gemma2:7B is available..."
    docker-compose exec ollama ollama list | grep -q "gemma2:7b" || {
        print_warning "Gemma2:7B model not found. Pulling model..."
        docker-compose exec ollama ollama pull gemma2:7b
    }
    
    print_success "All services are starting up!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend: http://localhost:8080"
    print_status "Ollama: http://localhost:11434"
}

# Function to stop all services
stop_services() {
    print_status "Stopping PolishPad services..."
    docker-compose down
    print_success "All services stopped"
}

# Function to restart all services
restart_services() {
    print_status "Restarting PolishPad services..."
    docker-compose restart
    print_success "All services restarted"
}

# Function to view logs
view_logs() {
    if [ -z "$1" ]; then
        print_status "Showing logs for all services..."
        docker-compose logs -f
    else
        print_status "Showing logs for $1..."
        docker-compose logs -f "$1"
    fi
}

# Function to rebuild services
rebuild_services() {
    print_status "Rebuilding PolishPad services..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    print_success "Services rebuilt and started"
}

# Function to show status
show_status() {
    print_status "PolishPad Services Status:"
    docker-compose ps
}

# Function to clean up
cleanup() {
    print_warning "This will remove all containers, networks, and volumes created by PolishPad"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning up..."
        docker-compose down -v --remove-orphans
        docker-compose rm -f
        print_success "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Main script logic
case "$1" in
    start)
        check_dependencies
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    logs)
        view_logs "$2"
        ;;
    rebuild)
        check_dependencies
        rebuild_services
        ;;
    status)
        show_status
        ;;
    cleanup)
        cleanup
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs [service]|rebuild|status|cleanup}"
        echo ""
        echo "Commands:"
        echo "  start    - Start all PolishPad services"
        echo "  stop     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  logs     - View logs (optionally for specific service: frontend, backend, ollama)"
        echo "  rebuild  - Rebuild and restart all services"
        echo "  status   - Show status of all services"
        echo "  cleanup  - Remove all containers, networks, and volumes"
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 logs backend"
        echo "  $0 rebuild"
        exit 1
        ;;
esac
