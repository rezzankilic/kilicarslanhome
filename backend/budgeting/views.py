from budgeting.models import Budget
from budgeting.serializers import BudgetSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def budgeting(request):
    if request.method == 'GET':
        data = Budget.objects.all()
        serializer = BudgetSerializer(data, many=True)
        return Response({'budgeting': serializer.data})
    elif request.method == 'POST':
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'bud':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def bud(request, id):
    try:
        data = Budget.objects.get(pk=id)
    except Budget.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BudgetSerializer(data)
        return Response({'bud': serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        serializer = BudgetSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'bud': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
